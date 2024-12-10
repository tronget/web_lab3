const updateClock = () => {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.innerHTML = now.toLocaleString();
}

window.onload = () => {
  updateClock();
  setInterval(updateClock, 1000);
};