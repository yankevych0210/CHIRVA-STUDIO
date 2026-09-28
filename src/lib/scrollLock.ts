// Body scroll lock that also works in iOS Safari, where `overflow: hidden`
// on <body> alone doesn't stop the page from scrolling behind an overlay.
// Ref-counted, so the mobile menu and the lightbox can't unlock each other.

let locks = 0;
let savedY = 0;

export function lockScroll(): () => void {
  if (locks++ === 0) {
    const { body, documentElement: html } = document;
    const scrollbar = window.innerWidth - html.clientWidth;
    savedY = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${savedY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks > 0) return;
    const { body, documentElement: html } = document;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
    // Restore instantly — without this `scroll-behavior: smooth` animates the jump
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, savedY);
    html.style.scrollBehavior = '';
  };
}
