export const addDeadline = (deadlines, deadlineToAdd) => {
   return [...deadlines, {...deadlineToAdd }]
}

export const removeDeadline = (deadlines, deadlineToRemove) => {
   const existingDeadline = deadlines.find(
      deadline => deadline.id === deadlineToRemove.id
   )

   // Filters out the specified deadline from the array
   if (existingDeadline) {
      return deadlines.filter(deadline => deadline.id !== deadlineToRemove.id);
   }

   else {
      return deadlines;
   }
}

export const sortDeadline = (deadlines, sortFlag) => {
   let length = deadlines.length;

   // Add a dateTime for each deadline in the deadlinesay
   for (let i = 0; i< length; i++) {
      let date = `${deadlines[i].date} ${deadlines[i].time}`
      let dateTime = (new Date(date)).getTime(); // Epoch time
      deadlines[i].dateTime = dateTime
   }

   // Bubble sort 
   var swapp;   
   do {
      swapp = false;
      for (var i = 0; i < length-1; i++) {
         if (deadlines[i].dateTime > deadlines[i+1].dateTime) {
            var temp = deadlines[i];
            deadlines[i] = deadlines[i+1];
            deadlines[i+1] = temp;
            swapp = true;
         }
      }
   } while(swapp);

   if (sortFlag) return [...deadlines];
   else return [...deadlines.reverse()];
};
