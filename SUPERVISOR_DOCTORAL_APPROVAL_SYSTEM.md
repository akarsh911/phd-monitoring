# Supervisor & Doctoral Committee Approval System

## Overview
This system allows HOD and PhD Coordinators to propose changes to student supervisors and doctoral committee members. All changes require DORDC approval before being applied to the database. This preserves existing form-based workflows (SupervisorAllocation, SupervisorChange, ConstituteOfIRB) while adding flexible management capabilities.

## Architecture

### Database Schema
**Table:** `supervisor_doctoral_changes`
- Tracks all change requests separately from main supervisor/doctoral_commitee tables
- Fields:
  - `student_id` - Student being modified
  - `change_type` - add, remove, or replace
  - `member_type` - supervisor or doctoral
  - `faculty_type` - internal or external
  - `old_faculty_code` - For remove/replace operations
  - `new_faculty_code` - For add/replace operations
  - `outside_expert_id` - For external faculty
  - `status` - pending, approved, or rejected
  - `requested_by` - User who proposed the change
  - `approved_by` - User who approved/rejected (DORDC)
  - `reason` - Justification for the change
  - `approved_at` - Timestamp of approval/rejection

### Workflow
1. **Propose Change** (HOD/Coordinator)
   - Opens SupervisorDoctoralManager from student ProfileCard
   - Selects Add/Remove/Replace for supervisors or doctoral committee
   - Chooses faculty type (internal/external)
   - Selects faculty member or outside expert
   - Provides reason for change
   - Change saved with status='pending'

2. **Review Changes** (DORDC)
   - Views all pending changes in DORDC Approval Dashboard
   - Sees student info, change details, requester, and reason
   - Can approve or reject with optional reason

3. **Apply Changes** (Automatic on Approval)
   - Approved changes automatically applied to:
     - `supervisors` table (for supervisor changes)
     - `doctoral_commitee` table (for doctoral committee changes)
   - External experts automatically converted to Faculty records via `getFaculty()` method
   - Change status updated to 'approved' with timestamp

## Files Created/Modified

### Backend (Laravel)

#### Migration
- `server/database/migrations/2025_11_24_110000_create_supervisor_doctoral_changes_table.php`
  - Creates supervisor_doctoral_changes tracking table
  - Foreign keys to students and users tables

#### Model
- `server/app/Models/SupervisorDoctoralChange.php`
  - Relationships: student, requester, approver, oldFaculty, newFaculty, outsideExpert
  - Fillable fields for all change attributes

#### Controller
- `server/app/Http/Controllers/SupervisorDoctoralChangeController.php`
  - **listPendingChanges()** - Get all pending changes (DORDC view)
  - **proposeChange()** - HOD/Coordinator submit change requests
    - Validates change_type requirements
    - Checks department permissions
    - Creates pending change record
  - **approveChange()** - DORDC approves and applies changes
    - Uses DB transactions for atomic operations
    - Calls applySupervisorChange() or applyDoctoralChange()
  - **rejectChange()** - DORDC rejects with reason
  - **getStudentPendingChanges()** - View pending for specific student
  - **applySupervisorChange()** - Applies approved supervisor changes (add/remove/replace)
  - **applyDoctoralChange()** - Applies approved doctoral committee changes
  - **getFacultyCode()** - Handles external experts by creating Faculty records

#### Routes
- `server/routes/base/supervisor_doctoral_changes.php`
  - POST `/api/supervisor-doctoral-changes/propose` - Submit change request
  - GET `/api/supervisor-doctoral-changes/pending` - List all pending (DORDC)
  - GET `/api/supervisor-doctoral-changes/student/{studentId}/pending` - Student-specific pending
  - PUT `/api/supervisor-doctoral-changes/approve/{changeId}` - Approve change
  - PUT `/api/supervisor-doctoral-changes/reject/{changeId}` - Reject change
  - All routes protected with `auth:sanctum` middleware

- `server/routes/api.php`
  - Added Route::prefix('supervisor-doctoral-changes') group

### Frontend (React)

#### Components
- `client-new/src/components/supervisorDoctoralManager/SupervisorDoctoralManager.js`
  - Modal-based management UI
  - Tables showing current supervisors and doctoral committee
  - Add/Remove/Replace buttons for each member
  - Faculty type selector (internal/external)
  - InputSuggestions for faculty/outside expert selection
  - Reason textarea for justification
  - Displays pending changes count with warning banner
  - Reset and refresh functionality

- `client-new/src/components/profileCard/ProfileCard.js` (Modified)
  - Added "Manage Supervisors/Doctoral" button (visible to HOD/Coordinator)
  - Integrates SupervisorDoctoralManager in modal
  - Refreshes profile data after changes submitted

#### Pages
- `client-new/src/pages/SupervisorDoctoralApproval/SupervisorDoctoralApproval.js`
  - DORDC dashboard for reviewing pending changes
  - PagenationTable displaying all pending requests
  - Shows: Student, Roll No, Department, Change Description, Reason, Requester, Date
  - Approve/Reject buttons for each change
  - Reject modal with reason textarea
  - Refresh button to reload pending changes

#### Routing & Navigation
- `client-new/src/App.js` (Modified)
  - Added import for SupervisorDoctoralApproval
  - Added route: `/supervisor-doctoral-approvals` (role: dordc)

- `client-new/src/components/navbar/CustomNavBar.js` (Modified)
  - Added menu item: "Supervisor Approvals" (role: dordc)
  - Icon: `fa-check-circle`

## Permission Model

### HOD & PhD Coordinator
- Can propose changes (add/remove/replace supervisors or doctoral committee)
- Can only manage students in their department
- Can add external members via outside experts
- Cannot directly modify supervisor/doctoral tables

### DORDC
- Can view all pending changes across all departments
- Can approve or reject changes
- Approval triggers automatic application to supervisor/doctoral tables
- Rejection requires providing a reason

### Students & Other Roles
- No access to change management
- Can view supervisors/doctoral committee in ProfileCard (read-only)

## Existing Workflows Preserved

This system **does not interfere** with existing form-based workflows:
- `SupervisorAllocation` - Initial supervisor assignment forms
- `SupervisorChange` - Supervisor change request forms
- `ConstituteOfIRB` - Doctoral committee constitution forms

These forms continue to write directly to the `supervisors` and `doctoral_commitee` tables as before.

## External Faculty Handling

When an outside expert is selected:
1. Controller calls `OutsideExpert->getFaculty()` method
2. Creates corresponding `Faculty` record with external type
3. Auto-generates faculty code (EXT000001+)
4. Returns faculty_code for use in supervisor/doctoral tables
5. Maintains link to original OutsideExpert record

## Testing Checklist

### Backend Testing
- [ ] Run migration: `php artisan migrate`
- [ ] Test proposeChange() API with different change types
- [ ] Test approveChange() API and verify database updates
- [ ] Test rejectChange() API with reason
- [ ] Test listPendingChanges() API as DORDC
- [ ] Test permission checks (HOD can only manage their department)
- [ ] Test external expert → faculty conversion

### Frontend Testing
- [ ] Open student ProfileCard as HOD/Coordinator
- [ ] Click "Manage Supervisors/Doctoral" button
- [ ] Test Add supervisor (internal faculty)
- [ ] Test Add doctoral committee member (external expert)
- [ ] Test Remove supervisor/doctoral member
- [ ] Test Replace operation
- [ ] Verify pending changes banner appears
- [ ] Login as DORDC
- [ ] Navigate to "Supervisor Approvals" menu item
- [ ] View pending changes in dashboard
- [ ] Test approve change and verify ProfileCard updates
- [ ] Test reject change with reason
- [ ] Verify rejected reason visible in rejection confirmation

### Integration Testing
- [ ] Full workflow: Propose → Review → Approve → Verify in database
- [ ] Full workflow: Propose → Review → Reject → Verify not applied
- [ ] Multiple pending changes for same student
- [ ] Cross-department change attempt (should fail for HOD)
- [ ] External expert auto-creation and assignment

## API Endpoints Summary

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/supervisor-doctoral-changes/propose` | HOD, Coordinator | Submit change request |
| GET | `/api/supervisor-doctoral-changes/pending` | DORDC | List all pending changes |
| GET | `/api/supervisor-doctoral-changes/student/{id}/pending` | HOD, Coordinator | Student-specific pending |
| PUT | `/api/supervisor-doctoral-changes/approve/{id}` | DORDC | Approve and apply change |
| PUT | `/api/supervisor-doctoral-changes/reject/{id}` | DORDC | Reject change with reason |

## Database Transaction Safety

All change applications use Laravel's DB transactions:
```php
DB::beginTransaction();
try {
    // Apply changes to supervisor/doctoral tables
    // Update change status to 'approved'
    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    // Return error
}
```

This ensures atomic operations - either all changes apply successfully or none do.

## Next Steps

1. Run the migration to create the `supervisor_doctoral_changes` table
2. Test the full workflow end-to-end
3. Verify permissions work correctly for all roles
4. Add any additional validation rules as needed
5. Consider adding email notifications for DORDC when new changes are pending
6. Consider adding audit log entries for all change operations

## Notes

- Migration date: 2025_11_24 (future dated, update as needed)
- Faculty codes for external members follow pattern: EXT000001, EXT000002, etc.
- All change requests include audit trail (requested_by, approved_by, timestamps)
- Pending changes visible to both HOD/Coordinator (their students) and DORDC (all)
- System handles both supervisor and doctoral committee changes with same workflow
