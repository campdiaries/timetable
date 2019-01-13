
export interface Student {
    studentId: string;
    studentName: string;
    studentGrade: number;
    profilePicUrl: string;
    volEmailAddress: string;
    volName: string;
    school: string;
    selectedActivities: SelectedActivity[];
    schoolId: string;
}

export interface SelectedActivity {
    activityName: string;
    activtyPriority: number;
    vounteerScore: number;
}
