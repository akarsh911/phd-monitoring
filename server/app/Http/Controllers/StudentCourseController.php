<?php

namespace App\Http\Controllers;

use App\Models\StudentCourse;
use App\Models\Student;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class StudentCourseController extends Controller
{
    /**
     * Get courses for logged-in student
     */
    public function getStudentCourses(Request $request)
    {
        try {
            $loggedInUser = Auth::user();
            $student = $loggedInUser->student;

            if (!$student) {
                return response()->json([
                    'message' => 'Student not found'
                ], 404);
            }

            $status = $request->query('status'); // 'enrolled' or 'completed'

            $query = StudentCourse::with('course.department')
                ->where('student_id', $student->id);

            if ($status) {
                $query->where('status', $status);
            }

            $courses = $query->orderBy('semester', 'desc')->get();

            $result = $courses->map(function ($studentCourse) {
                return [
                    'id' => $studentCourse->id,
                    'course_code' => $studentCourse->course->course_code,
                    'course_name' => $studentCourse->course->course_name,
                    'credits' => $studentCourse->course->credits,
                    'department_name' => $studentCourse->course->department->name ?? 'N/A',
                    'semester' => $studentCourse->semester,
                    'status' => $studentCourse->status,
                    'grade' => $studentCourse->grade,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $result
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching student courses: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Tag student with course (Admin/HOD/Coordinator)
     */
    public function tagStudentWithCourse(Request $request)
    {
        try {
          
            $request->validate([
                'student_id' => 'required|integer',
                'course_id' => 'required|integer',
                'semester' => 'required|string',
                'status' => 'nullable|in:enrolled,completed',
                'grade' => 'nullable|string',
            ]);
           
            // Check if already enrolled
            $existing = StudentCourse::where('student_id', $request->student_id)
                ->where('course_id', $request->course_id)
                ->where('semester', $request->semester)
                ->first();

            if ($existing) {
                // Update existing record
                $existing->status = $request->status ?? $existing->status;
                if ($request->grade) {
                    $existing->grade = $request->grade;
                }
                $existing->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Student course enrollment updated successfully',
                    'data' => $existing
                ], 200);
            }

            $studentCourse = new StudentCourse();
            $studentCourse->student_id = $request->student_id;
            $studentCourse->course_id = $request->course_id;
            $studentCourse->semester = $request->semester;
            $studentCourse->status = $request->status ?? 'enrolled';
            $studentCourse->grade = $request->grade;
            $studentCourse->save();

            return response()->json([
                'success' => true,
                'message' => 'Student tagged with course successfully',
                'data' => $studentCourse
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error tagging student with course: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update grade for student course
     */
    public function updateGrade(Request $request, $id)
    {
        try {
            $request->validate([
                'grade' => 'required|string',
                'status' => 'required|in:enrolled,completed',
            ]);

            $studentCourse = StudentCourse::find($id);
            if (!$studentCourse) {
                return response()->json([
                    'message' => 'Student course record not found'
                ], 404);
            }

            $studentCourse->grade = $request->grade;
            $studentCourse->status = $request->status;
            $studentCourse->save();

            return response()->json([
                'success' => true,
                'message' => 'Grade updated successfully',
                'data' => $studentCourse
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating grade: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get courses for specific student (Admin view)
     */
    public function getCoursesForStudent($studentId)
    {
        try {
            $student = Student::find($studentId);
            if (!$student) {
                return response()->json([
                    'message' => 'Student not found'
                ], 404);
            }

            $courses = StudentCourse::with('course.department')
                ->where('student_id', $studentId)
                ->orderBy('semester', 'desc')
                ->get();

            $result = $courses->map(function ($studentCourse) {
                return [
                    'id' => $studentCourse->id,
                    'course_code' => $studentCourse->course->course_code,
                    'course_name' => $studentCourse->course->course_name,
                    'credits' => $studentCourse->course->credits,
                    'department_name' => $studentCourse->course->department->name ?? 'N/A',
                    'semester' => $studentCourse->semester,
                    'status' => $studentCourse->status,
                    'grade' => $studentCourse->grade,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $result,
                'student_name' => $student->name,
                'student_code' => $student->student_code,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching courses for student: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove student from course
     */
    public function removeStudentFromCourse($id)
    {
        try {
            $studentCourse = StudentCourse::find($id);
            if (!$studentCourse) {
                return response()->json([
                    'message' => 'Student course record not found'
                ], 404);
            }

            $studentCourse->delete();

            return response()->json([
                'success' => true,
                'message' => 'Student removed from course successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error removing student from course: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk import student-course tagging from CSV
     * CSV Format: roll_number,course_code,semester,status,grade
     */
    public function bulkImportFromCSV(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:csv,txt',
            ]);

            $file = $request->file('file');
            $csvData = array_map('str_getcsv', file($file->getRealPath()));
            $header = array_shift($csvData);

            $successCount = 0;
            $errorCount = 0;
            $errors = [];

            foreach ($csvData as $index => $row) {
                try {
                    if (count($row) < 4) {
                        $errors[] = "Row " . ($index + 2) . ": Insufficient columns";
                        $errorCount++;
                        continue;
                    }

                    $rollNumber = trim($row[0]);
                    $courseCode = trim($row[1]);
                    $semester = trim($row[2]);
                    $status = trim($row[3] ?? 'enrolled');
                    $grade = isset($row[4]) ? trim($row[4]) : null;

                    // Find student by roll number
                    $student = Student::where('roll_no', $rollNumber)->first();
                    if (!$student) {
                        $errors[] = "Row " . ($index + 2) . ": Student with roll number {$rollNumber} not found";
                        $errorCount++;
                        continue;
                    }

                    // Find course by course code
                    $course = Course::where('course_code', $courseCode)->first();
                    if (!$course) {
                        $errors[] = "Row " . ($index + 2) . ": Course with code {$courseCode} not found";
                        $errorCount++;
                        continue;
                    }

                    // Validate status
                    if (!in_array($status, ['enrolled', 'completed'])) {
                        $errors[] = "Row " . ($index + 2) . ": Invalid status '{$status}'. Must be 'enrolled' or 'completed'";
                        $errorCount++;
                        continue;
                    }

                    // Check if already exists
                    $existing = StudentCourse::where('student_id', $student->id)
                        ->where('course_id', $course->id)
                        ->where('semester', $semester)
                        ->first();

                    if ($existing) {
                        // Update existing record
                        $existing->status = $status;
                        if ($grade) {
                            $existing->grade = $grade;
                        }
                        $existing->save();
                    } else {
                        // Create student course record
                        $studentCourse = new StudentCourse();
                        $studentCourse->student_id = $student->id;
                        $studentCourse->course_id = $course->id;
                        $studentCourse->semester = $semester;
                        $studentCourse->status = $status;
                        if ($status === 'completed' && $grade) {
                            $studentCourse->grade = $grade;
                        }
                        $studentCourse->save();
                    }

                    $successCount++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                    $errorCount++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Import completed: {$successCount} successful, {$errorCount} errors",
                'data' => [
                    'success_count' => $successCount,
                    'error_count' => $errorCount,
                    'errors' => $errors,
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error importing student courses from CSV: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }
}
