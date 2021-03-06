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
    const header = document.querySelector('header.new-mint-header');

    const orangeMenuContainer = document.querySelector('.header-main-line');
    const container = orangeMenuContainer.querySelector('.container-1410');

    if (window.scrollY > 0)
    {
        header.classList.add('sticky');

        if (orangeMenuContainer.dataset.opened !== "true")
        {
            orangeMenuContainer.style.height = `0px`;
        }
    }
    else if (window.scrollY === 0)
    {
        header.classList.remove('sticky');
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

// open first menu
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
        
        const activeMainSection = document.querySelector('.main-section.active');
        activeMainSection.classList.remove('active');

        const target = activeMainSection.querySelector('.mobile-main-section__title-wrapper');

        // const active
        closeOrangeSubmenuFirstLevel(null, target);
    }

    // hide opened third-level submenu
    if (document.querySelector('.third-level-menu-points-list'))
    {
        document.querySelector('.third-level-menu-points-list').classList.remove('opened');
    }
}

// open second menu
function openOrangeSubmenuFirstLevel(event)
{
    // event currentTarget === .mobile-main-section__title-wrapper

    if (event.target.tagName === 'A') return

    // change listeners
    event.currentTarget.removeEventListener('click', openOrangeSubmenuFirstLevel, true);
    event.currentTarget.addEventListener('click', closeOrangeSubmenuFirstLevel, true);
    console.log('open 2nd level')

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

// close second menu
function closeOrangeSubmenuFirstLevel(event, currentElem = null)
{
    // change listeners
    if (event)
    {
        event.currentTarget.removeEventListener('click', closeOrangeSubmenuFirstLevel, true);
        event.currentTarget.addEventListener('click', openOrangeSubmenuFirstLevel, true);
    }
    else if (!event && currentElem)
    {
        currentElem.removeEventListener('click', closeOrangeSubmenuFirstLevel, true);
        currentElem.addEventListener('click', openOrangeSubmenuFirstLevel, true);
    }
    console.log('close 2nd level');

    let wrapper = null;

    if (event)
    {
        wrapper = event.currentTarget.closest('.main-section');
    }
    else if (!event && currentElem)
    {
        wrapper = currentElem.closest('.main-section');
    }

    wrapper.classList.remove('active');

    const firstLevelSubMenu =
        wrapper.querySelector(`.main-section-dropdown`);
    firstLevelSubMenu.classList.remove('active');

    setTimeout( () => {
        firstLevelSubMenu.style.height = '0px';
        firstLevelSubMenu.style.maxHeight = '0px';
    }, 300)

}

// open third menu
function openMobileSubmenuSecondLevel(event)
{
    const activeMainSection = document.querySelector('.main-section.active .mobile-main-section__title-wrapper');

    activeMainSection.removeEventListener('click', closeOrangeSubmenuFirstLevel, true);
    activeMainSection.addEventListener('click', closeMobileSubmenuSecondLevel, true);

    console.log('open 3rd level');

    if (document.querySelector('.third-level-menu-points-list.opened'))
    {
        document.querySelector('.third-level-menu-points-list.opened').classList.remove('opened');
    }

    const titleText = event.currentTarget.querySelector('.mobile-main-section__subtitle').textContent;

    // change title
    activeMainSection.querySelector('.mobile-main-section__title').dataset.initialTitle = 
        activeMainSection.querySelector('.mobile-main-section__title').textContent;

    activeMainSection.querySelector('.mobile-main-section__title').textContent = titleText;

    const wrapper = event.currentTarget.closest('.mobile-main-section__third-level-menu-item');

    // get list
    const thirdLevelList = wrapper.querySelector('.third-level-menu-points-list');

    document.querySelector('.main-section-dropdown.active').style.top = 
        `${document.querySelector('.main-section.active').clientHeight}px`;

    thirdLevelList.classList.toggle('opened');
}

// close third menu
function closeMobileSubmenuSecondLevel(event)
{
    event.currentTarget.removeEventListener('click', closeMobileSubmenuSecondLevel, true);
    event.currentTarget.addEventListener('click', closeOrangeSubmenuFirstLevel, true);

    console.log('close 3rd level');

    const activeMainSection = document.querySelector('.main-section.active');

    activeMainSection.querySelector('.mobile-main-section__title').textContent = 
        activeMainSection.querySelector('.mobile-main-section__title-wrapper .mobile-main-section__title').dataset.initialTitle;

    document.querySelector('.main-section-dropdown.active').style.top = 
        `${document.querySelector('.main-section.active').clientHeight}px`;

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

        // open main orange menu listener
        document.querySelector('.mobile-services-menu__title-wrapper').addEventListener('click', openMobileOrangeMainMenu);

        // open first level submenu listener
        document.querySelectorAll('.mobile-main-section__title-wrapper')
            .forEach(item => item.addEventListener('click',  openOrangeSubmenuFirstLevel, true))

        // open second level submenu listener
        document.querySelectorAll('.mobile-main-section__subtitle-wrapper')
            .forEach(item => item.addEventListener('click', openMobileSubmenuSecondLevel, true))

        // hide mobile orange menu
        document.querySelector('.mobile-services-menu__main-sections').style.top =
            `${-window.innerHeight - document.querySelector('.mobile-services-menu__main-sections').clientHeight}px`;

        // unheight all submenus
        document.querySelectorAll('.main-section-dropdown').forEach(item => item.style.maxHeight = '0px');
    }
}

document.addEventListener('DOMContentLoaded', e => {
    initHandlers();
})