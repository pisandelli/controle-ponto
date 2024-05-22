export const useCurrentTime = () => {
  const dayjs = useDayjs();
  const time = ref(dayjs().format('HH:mm:ss'));
  let interval: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    interval = setInterval(() => {
      time.value = dayjs().format('HH:mm:ss');
    }, 10);
  });
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
  return time;
};
