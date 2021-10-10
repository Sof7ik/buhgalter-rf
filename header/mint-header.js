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
        orangeMenuContainer.style.height = `0px`;
        orangeMenuContainer.dataset.opened = 'false';
        event.currentTarget.querySelector('img.icon').style.transform = 'rotate(0)';
    }
}

function initHandlers()
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
        document.getElementById('burger-menu-block')
            .querySelectorAll(
    '.mobile-burger-navigation .burger-navigation-item.wrapper .burger-navigation-item__inner-link-wrapper svg')
            .forEach(arrowElem => arrowElem.addEventListener('click', openBurgerNavSubmenu));

        document.querySelectorAll('.mobile-main-section__title-icon')
            .forEach(item => item.addEventListener('click', openOrangeSubmenuFirstLevel));
    }
}

function burgerMenuHandler(event)
{
    const burgerMenuElem = document.getElementById('burger-menu-block');

    event.currentTarget.classList.toggle('opened');
    burgerMenuElem.classList.toggle('showed');
}

function openBurgerNavSubmenu(event)
{
    const wrapper = event.currentTarget.closest('.burger-navigation-item.wrapper');
    const dropdownWrapper = wrapper.querySelector('.burger-navigation-item__inner-dropdown-wrapper');
    const linksListElem = dropdownWrapper.querySelector('.links-list');

    wrapper.classList.toggle('opened');
    if (wrapper.classList.contains('opened'))
    {
        dropdownWrapper.style.height = `${linksListElem.clientHeight}px`;
    }
    else
    {
        dropdownWrapper.style.height = `0px`;
    }
}

function openOrangeSubmenuFirstLevel(event)
{
    let activeTitle = null;

    // close opened dropdown
    if (document.querySelector('.main-section-dropdown.active'))
    {
        const activeElem = document.querySelector('.main-section-dropdown.active');
        activeElem.classList.remove('active');
    }

    // find active title
    if (document.querySelector('.main-section.active'))
    {
        activeTitle = document.querySelector('.main-section.active');
    }

    // title and arrow
    const wrapper = event.currentTarget.closest('.main-section');

    // active new on opening and deacticve on closing
    wrapper.classList.toggle('active');

    // on closing
    // deactive old active title
    activeTitle && activeTitle.classList.remove('active');

    if (wrapper.classList.contains('active'))
    {
        wrapper.parentElement.classList.add('not-scrollable');

        const parentID = wrapper.dataset.mobileServicesMenuDropdownParent;

        const firstLevelSubMenu =
            document.querySelector(`.main-section-dropdown[data-mobile-services-menu-dropdown="${parentID}"]`);

        firstLevelSubMenu.style.top = `${wrapper.getBoundingClientRect().y + wrapper.clientHeight}px`;
        firstLevelSubMenu.style.height = `${window.innerHeight - wrapper.getBoundingClientRect().y - wrapper.clientHeight}px`;
        firstLevelSubMenu.classList.add('active');
    }
    else
    {
        wrapper.parentElement.classList.remove('not-scrollable');
    }
}

document.addEventListener('DOMContentLoaded', e => {
    window.addEventListener('resize', initHandlers);
    initHandlers();
})