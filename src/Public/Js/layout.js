window.addEventListener('resize', adjustHeadingWidth);
window.addEventListener('DOMContentLoaded', adjustHeadingWidth);

function adjustHeadingWidth() {
    const tabletBreakpoint = 700;
    const contentSection = document.querySelector('.content-section');
    const headingSection = document.querySelector('.heading__section');
    const contentBorder = document.querySelector('.content-border');

    if (window.innerWidth > tabletBreakpoint) {
        const contentWidth = window.getComputedStyle(contentSection).width;
        headingSection.style.minWidth = contentWidth;
        contentBorder.style.minWidth = contentWidth;
    }
}
