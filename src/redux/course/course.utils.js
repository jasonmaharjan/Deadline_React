export const addDeadline = (deadlines, deadlineToAdd) => {
   return [...deadlines, {...deadlineToAdd }]
}

export const removeDeadline = (deadlines, deadlineToRemove) => {
   const existingDeadline = deadlines.find(
      deadline => deadline.id === deadlineToRemove.id
   )
   // Filters out the deadlines that need to be removed
   if (existingDeadline) {
      return deadlines.filter(deadline => deadline.id !== deadlineToRemove.id);
   }

   else {
      return deadlines;
   }
}