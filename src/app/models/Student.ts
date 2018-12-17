
export interface Student {
    studentId: string;
    studentName: string;
    studentGrade: number;
    profilePicUrl: string;
    volEmailAddress: string;
    volName: string;
    school: string;
    selectedActivities: SelectedActivity[];
    schooldId: string;
}

export interface SelectedActivity {
    activityname: string;
    activtyPriority: number;
    vounteerScore: number;
}
