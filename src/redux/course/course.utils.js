export const addDeadline = (deadlines, deadlineToAdd) => {
   return [...deadlines, {...deadlineToAdd }];
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

export const editDeadline = (deadlines, deadlineToEdit) => {
   // deadlineToEdit[0] = old deadline
   // deadlineToEdit[1] = new deadline
   return [{...deadlineToEdit[1]}, ...deadlines.filter(deadline => deadline.id !== deadlineToEdit[0].id)];
}
