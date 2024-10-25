
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/activity+json'
        }
    }

    fetch('https://toot.ter05.net/users/t#main-key', options).then(response => {
        response.json().then(data => {
            console.log(data)
        })
    })



