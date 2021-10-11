// this is desktop function
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

function burgerMenuHandler(event)
{
    const burgerMenuElem = document.getElementById('burger-menu-block');

    event.currentTarget.classList.toggle('opened');
    burgerMenuElem.classList.toggle('showed');
}

function openBurgerNavSubmenu(event)
{
    if (event.target.tagName === 'A') return

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

function openMobileOrangeMainMenu(event)
{
    const menuBlock = event.currentTarget.closest('.mobile-services-menu')
        .querySelector('.mobile-services-menu__main-sections');

    document.body.classList.toggle('not-scrollable');
    document.querySelector('html').classList.toggle('not-scrollable');

    menuBlock.classList.toggle('active');
    document.querySelector('.new-mint-header').classList.toggle('opened-mobile-services');

    // hide opened submenu
    if (!document.querySelector('.new-mint-header').classList.contains('opened-mobile-services')
        && document.querySelector('.main-section-dropdown.active'))
    {
        document.querySelector('.main-section.active').classList.remove('active');
        document.querySelector('.main-section-dropdown.active').classList.remove('active');
    }

    // hide opened third-level submenu
    if (document.querySelector('.third-level-menu-points-list'))
    {
        document.querySelector('.third-level-menu-points-list').classList.remove('opened');
    }
}

function openOrangeSubmenuFirstLevel(event)
{
    if (event.target.tagName === 'A') return

    // change listeners
    event.currentTarget.removeEventListener('click', openOrangeSubmenuFirstLevel, true);
    event.currentTarget.addEventListener('click', closeOrangeSubmenuFirstLevel, true);

    console.log('open handler')

    let activeTitle = null;

    // close opened dropdown
    if (document.querySelector('.main-section-dropdown.active'))
    {
        const activeElem = document.querySelector('.main-section-dropdown.active');
        activeElem.classList.remove('active');

        setTimeout(() => {
            activeElem.style.maxHeight = '0px';
        }, 300)
    }

    // find active title
    if (document.querySelector('.main-section.active'))
    {
        activeTitle = document.querySelector('.main-section.active');
    }

    // title and arrow
    const wrapper = event.currentTarget.closest('.main-section');

    // active new on opening and deacticve on closing
    wrapper.classList.add('active');

    // on closing
    // deactive old active title
    activeTitle && activeTitle.classList.remove('active');

    // get first level submenu node
    const firstLevelSubMenu = wrapper.querySelector(`.main-section-dropdown`);
    firstLevelSubMenu.style.top = `${wrapper.clientHeight}px`;

    firstLevelSubMenu.style.height =
        `${
            window.innerHeight -
            document.querySelector('.header-top-side').clientHeight -
            document.querySelector('.mobile-services-menu__title-wrapper').clientHeight}px`;

    firstLevelSubMenu.style.maxHeight =
        `${
            window.innerHeight -
            document.querySelector('.header-top-side').clientHeight -
            document.querySelector('.mobile-services-menu__title-wrapper').clientHeight}px`;

    firstLevelSubMenu.classList.add('active');
}

function closeOrangeSubmenuFirstLevel(event)
{
    // change listeners
    event.currentTarget.removeEventListener('click', closeOrangeSubmenuFirstLevel, true);
    event.currentTarget.addEventListener('click', openOrangeSubmenuFirstLevel, true);

    console.log('close handler');

    const wrapper = event.currentTarget.closest('.main-section');
    wrapper.classList.remove('active');

    const firstLevelSubMenu =
        wrapper.querySelector(`.main-section-dropdown`);
    firstLevelSubMenu.classList.remove('active');

    firstLevelSubMenu.style.height = '0px';
    firstLevelSubMenu.style.maxHeight = '0px';
}

function openMobileSubmenuSecondLevel(event)
{
    console.log('open 2nd level');

    const activeMainSection = document.querySelector('.main-section.active');

    activeMainSection.removeEventListener('click', closeOrangeSubmenuFirstLevel, true);
    activeMainSection.addEventListener('click', closeMobileSubmenuSecondLevel, true);

    if (document.querySelector('.third-level-menu-points-list.opened'))
    {
        document.querySelector('.third-level-menu-points-list.opened').classList.remove('opened')
    }

    const titleText = event.currentTarget.querySelector('.mobile-main-section__subtitle').textContent;

    // change title
    activeMainSection.dataset.initialTitle = activeMainSection.querySelector('.mobile-main-section__title').textContent;

    activeMainSection.querySelector('.mobile-main-section__title').textContent = titleText;

    const wrapper = event.currentTarget.closest('.mobile-main-section__third-level-menu-item');

    // get list
    const thirdLevelList = wrapper.querySelector('.third-level-menu-points-list');

    // thirdLevelList.style.top = `${event.currentTarget.clientHeight}px`;

    thirdLevelList.classList.toggle('opened');
}

function closeMobileSubmenuSecondLevel(event)
{
    event.currentTarget.removeEventListener('click', closeMobileSubmenuSecondLevel, true);

    event.currentTarget.addEventListener('click', closeOrangeSubmenuFirstLevel, true);

    console.log('close 2nd level');

    const activeMainSection = document.querySelector('.main-section.active');
    activeMainSection.querySelector('.mobile-main-section__title').textContent = activeMainSection.dataset.initialTitle;

    document.querySelector('.third-level-menu-points-list.opened').classList.remove('opened');
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


        // ---------------------------------
        // init mobile handlers

        // open burger menu
        document.getElementById('burger-menu-btn').addEventListener('click', burgerMenuHandler);

        // open submenu such as "Company life" in submenu
        document.getElementById('burger-menu-block')
            .querySelectorAll(
                '.mobile-burger-navigation .burger-navigation-item.wrapper .burger-navigation-item__inner-link-wrapper svg')
            .forEach(arrowElem => arrowElem.addEventListener('click', openBurgerNavSubmenu));

        // open first level submenu
        document.querySelectorAll('.mobile-main-section__title-wrapper')
            .forEach(item => item.addEventListener('click',  openOrangeSubmenuFirstLevel, true))

        // hide mobile orange menu
        document.querySelector('.mobile-services-menu__main-sections').style.top =
            `${-window.innerHeight - document.querySelector('.mobile-services-menu__main-sections').clientHeight}px`;

        // unheight all submenus
        document.querySelectorAll('.main-section-dropdown').forEach(item => item.style.maxHeight = '0px');

        // open main orange menu
        document.querySelector('.mobile-services-menu__title-wrapper').addEventListener('click', openMobileOrangeMainMenu);

        // open second level submenu
        document.querySelectorAll('.mobile-main-section__subtitle-wrapper')
            .forEach(item => item.addEventListener('click', openMobileSubmenuSecondLevel, true))
    }
}

document.addEventListener('DOMContentLoaded', e => {
    initHandlers();
})