//NEED WORK

// export const useTimer = (initialTime?: string) => {
//   const dayjs = useDayjs();
//   const time = ref(0);
//   let interval: ReturnType<typeof setInterval> | undefined;
//   onMounted(() => {
//     interval = setInterval(() => {
//       time.value = dayjs.duration(time.value + 1, 's').format('HH:mm:ss');
//     }, 10);
//   });
//   onUnmounted(() => {
//     if (interval) {
//       clearInterval(interval);
//     }
//   });
//   return time;
// }
