/* 首屏骨架（index.html 等入口里的 #boot）在 React 挂载后淡出移除 */
export function dismissBoot() {
  const boot = document.getElementById("boot");
  if (!boot) return;
  boot.style.transition = "opacity 0.45s ease";
  boot.style.opacity = "0";
  setTimeout(() => boot.remove(), 500);
}
