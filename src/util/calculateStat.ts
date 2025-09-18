export const calculateChange = (submissionData:any)=>{
    try{

        const groupedStudents = submissionData.reduce((acc:any, student:any) => {
                    (acc[new Date(student.registeredDate as string).toDateString()] = acc[new Date(student.registeredDate as string).toDateString()] || []).push(student);
                return acc;
            }, {} as Record<string, any[]>);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const prev = Object.keys(groupedStudents);
            const current = groupedStudents[prev[prev.length - 1]];
            let currentCount = 0; 
            let prevCount = 0;
         
            if(prev){
                prevCount = groupedStudents[prev[prev.length - 2]].length;
            }
            if(current){
                currentCount = current.length;
            }
            if(prevCount == 0){
                return 0;
            }
            return ((currentCount - prevCount)/prevCount)*100 
    } catch(err){
        return 0;
    }
}