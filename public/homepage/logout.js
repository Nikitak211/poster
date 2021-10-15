document.getElementById('logout_btn').addEventListener('click',(e) => {
    logout()
})

async function logout() {

    const response = await fetch('/api/auth/logout' ,{
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    const json = await response.json()

        if ( json.success ) {
            location.reload()
            alert(json.message)
        }

        if ( json.error ) alert( json.message )
    }
