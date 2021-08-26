async function sendData(data)
{
    console.log(data)

    // const headers = {
    //     'Content-Type': 'application/json'
    // }

    // return await fetch('url', {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(data)
    // })
    //     .then(response => response.json())
}

function formHandler(event)
{
    event.preventDefault();

    // check all inputs for empty value
    event.currentTarget.querySelectorAll('.input-wrapper input').forEach(inputElem => {
        if (inputElem.value.trim() === '')
        {
            inputElem.closest('.input-wrapper').classList.add('invalid');
        }
        else
        {
            inputElem.closest('.input-wrapper').classList.remove('invalid');
        }
    })

    if (!document.querySelectorAll('.input-wrapper.invalid').length)
    {
        const dataObject = new FormData();

        document.querySelectorAll('.forum-form .forum-form__input').forEach(inputElem => {
            dataObject.append(inputElem.id, inputElem.value.trim());
            // dataObject[inputElem.id] = inputElem.value.trim();
        })

        sendData(dataObject).then(data => {
            // console.log(data)
        });
    }
}

document.addEventListener('DOMContentLoaded', e => {
    document.querySelector('form.forum-form').addEventListener('submit', formHandler);

    $('#member-phone').mask('+7 (999) 999-99-99');
})