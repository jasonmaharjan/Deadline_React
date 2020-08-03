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