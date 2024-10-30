export const getRoleName = (role) => {
    switch (role) {
        case 'student':
           return 'Student'
       case 'supervisor':
           return 'Supervisor';
        case 'faculty':
            return 'Superior';
        case 'hod':
            return 'HOD'
        case 'phd_coordinator':
            return 'PhD Coordinator';
        case 'dordc':
            return 'DORDC'
        case 'dra':
            return 'DRA'
    }
}