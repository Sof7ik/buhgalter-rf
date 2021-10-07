function orangeSubmenuHandler(event)
{
    const detailLinksBlockID = event.currentTarget.dataset.detailBlock;

    const orangeMenuItemWrapper = event.currentTarget.closest('.orange-section-dropdown');
    const newRightList = orangeMenuItemWrapper.querySelector(`.right-list[data-detail-block="${detailLinksBlockID}"]`);

    orangeMenuItemWrapper.querySelector('.left-list-button-wrapper.active').classList.remove('active');
    orangeMenuItemWrapper.querySelector('.right-list.active').classList.remove('active');

    newRightList.classList.add('active');
    event.currentTarget.classList.add('active');
}

function stickyHeader(event)
{
    const headerElem = document.querySelector('header.new-mint-header');
    const orangeMenuContainer = document.querySelector('.header-main-line');
    const container = orangeMenuContainer.querySelector('.container-1410');

    if (window.scrollY > 0)
    {
        headerElem.classList.add('sticky');

        if (orangeMenuContainer.dataset.opened !== "true")
        {
            orangeMenuContainer.style.height = `0px`;
        }
    }
    else if (window.scrollY === 0)
    {
        headerElem.classList.remove('sticky');
        orangeMenuContainer.style.height = `${container.clientHeight}px`;
    }
}

function openMenuInStickyHeader(event)
{
    const orangeMenuContainer = document.querySelector('.header-main-line');
    const container = orangeMenuContainer.querySelector('.container-1410');

    if (parseInt(orangeMenuContainer.style.height) === 0)
    {
        orangeMenuContainer.style.height = `${container.clientHeight}px`;
        orangeMenuContainer.dataset.opened = 'true';
        event.currentTarget.querySelector('img.icon').style.transform = 'rotate(180deg)';
    }
    else
    {
        console.log('2')

        orangeMenuContainer.style.height = `0px`;
        orangeMenuContainer.dataset.opened = 'false';
        event.currentTarget.querySelector('img.icon').style.transform = 'rotate(0)';
    }
}

function initHandlers(event)
{
    if (window.innerWidth > 600)
    {
        document.querySelectorAll('.left-list-button-wrapper')
            .forEach(item => item.addEventListener('click', orangeSubmenuHandler));

        window.addEventListener('scroll', stickyHeader);
        document.querySelector('.sticky-header-services-button').addEventListener('click', openMenuInStickyHeader);
    }
    else
    {
        document.querySelectorAll('.left-list-button-wrapper')
            .forEach(item => item.removeEventListener('click', orangeSubmenuHandler));

        window.removeEventListener('scroll', stickyHeader);
        document.querySelector('.sticky-header-services-button').removeEventListener('click', openMenuInStickyHeader);

        // init mobile handlers
        document.getElementById('burger-menu-btn').addEventListener('click', burgerMenuHandler);
    }
}

function burgerMenuHandler(event)
{
    const burgerMenuElem = document.getElementById('burger-menu-block');

    event.currentTarget.classList.toggle('opened');
    burgerMenuElem.classList.toggle('showed');
}

document.addEventListener('DOMContentLoaded', e => {
    window.addEventListener('resize', initHandlers);
    initHandlers(null);
})