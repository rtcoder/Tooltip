const createTooltipElement = () => {
    const body = document.body;

    const tooltipDiv = document.createElement('div');
    tooltipDiv.setAttribute('id', 'tooltip');

    const tooltipArrowDiv = document.createElement('div');
    tooltipArrowDiv.setAttribute('id', 'tooltipArrow');

    const tooltipTextDiv = document.createElement('div');
    tooltipTextDiv.setAttribute('id', 'tooltipText');

    tooltipDiv.appendChild(tooltipArrowDiv);
    tooltipDiv.appendChild(tooltipTextDiv);

    body.appendChild(tooltipDiv);
}
const getTooltipDiv = () => document.getElementById('tooltip');
const getTooltipArrowDiv = () => document.getElementById('tooltipArrow');
const getTooltipTextDiv = () => document.getElementById('tooltipText');

const displayTooltip = (element, content) => {
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return () => {
        const TooltipTextDiv = getTooltipTextDiv();
        const TooltipArrowDiv = getTooltipArrowDiv();
        const TooltipDiv = getTooltipDiv();
        TooltipTextDiv.innerHTML = content;
        TooltipArrowDiv.style.cssText = 'margin:0';
        TooltipDiv.classList.add('visible');

        const {top, left, width, height} = element.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const tooltipWidth = TooltipDiv.getBoundingClientRect().width;
        let realTop = top + window.pageYOffset

        let leftPos = left + (width / 2) - (tooltipWidth / 2);
        if (leftPos < 0) {
            TooltipArrowDiv.style.cssText = `margin-left: ${leftPos - 5}px`;
            leftPos = 5;
        }
        if (leftPos + tooltipWidth > windowWidth) {
            TooltipArrowDiv.style.cssText = `margin-left: ${(leftPos + tooltipWidth - windowWidth) + 15}px`;
            leftPos = windowWidth - tooltipWidth - 15;
        }

        TooltipDiv.style.cssText = `top: ${realTop + height + 10}px; left: ${leftPos}px`
    }
}

const hideTooltip = () => {
    const TooltipTextDiv = getTooltipTextDiv();
    const TooltipArrowDiv = getTooltipArrowDiv();
    const TooltipDiv = getTooltipDiv();
    TooltipTextDiv.innerHTML = '';
    TooltipDiv.classList.remove('visible');
    TooltipArrowDiv.style.cssText = 'margin:0';
}

(function () {
    createTooltipElement();

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const titleAttr = element.getAttribute('title');
        const titleAttrFromTooltip = element.getAttribute('data-tooltip');
        let content = titleAttrFromTooltip || titleAttr

        if (!content) {
            console.warn(element);
            console.warn('Warning: above element has empty "title" and "data-tooltip" attributes');
        } else {
            element.addEventListener('mouseenter', displayTooltip(element, content));
            element.addEventListener('mouseleave', hideTooltip)
        }
    })
})();
