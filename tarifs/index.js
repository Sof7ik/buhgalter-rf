function openDetailBlockDescription(event) {
    const detailMainWrapper = event.currentTarget.closest('.detail-info-wrapper');

    detailMainWrapper.classList.toggle('opened');

    const detailContentWrapper = detailMainWrapper.querySelector('.detail-info-content-wrapper');
    const detailContent = detailContentWrapper.querySelector('.detail-info-content');

    if (detailMainWrapper.classList.contains('opened')) {
        detailContentWrapper.style.height = `${detailContent.clientHeight + 24 + 28}px`;
    }
    else {
        detailContentWrapper.style.height = `0px`;
    }
}

function openFAQ(event) {
    const itemWrapper = event.currentTarget.closest('.dropdown-list__item');

    const contentWrapper = itemWrapper.querySelector('.item-content-wrapper');
    const content = contentWrapper.querySelector('.item-content');

    // only for button
    itemWrapper.classList.toggle('opened');

    // for padding, margin and border
    contentWrapper.classList.toggle('opened');

    if (contentWrapper.classList.contains('opened')) {
        contentWrapper.style.height = `${content.clientHeight + 17 + 30}px`;
    }
    else {
        contentWrapper.style.height = `0px`;
    }

}

document.addEventListener('DOMContentLoaded', e => {
    // close prices detail info
    document.querySelectorAll('.open-detail-info[data-open-detail-info-table]')
        .forEach(button => button.addEventListener('click', openDetailBlockDescription));

    // open detail info listeners
    document.querySelectorAll('.detail-info-wrapper .detail-info-content-wrapper').forEach(item => {
        item.style.height = `0px`;
    })

    // close FAQ
    document.querySelectorAll('.dropdown-list .dropdown-list__item .item-content-wrapper')
        .forEach(item => item.style.height = `0px`);

    // open FAQ listeners
    // document.querySelectorAll('.dropdown-list .dropdown-list__item .open-dropdown')
    //     .forEach(button => button.addEventListener('click', openFAQ));

    document.querySelectorAll('.dropdown-list .dropdown-list__item .item-heading')
        .forEach(button => button.addEventListener('click', openFAQ));
});