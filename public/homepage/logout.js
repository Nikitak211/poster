document.getElementById('logout_btn').addEventListener('click',(e) => {
    logout()
})

async function logout() {

    const response = await fetch('/api/auth/logout' ,{
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({send:'logout'})
    })
    const json = await response.json()
    if(req.body.send){
        res.send({logout: true})
        location.reload()
        alert(json.drop)
    }
    
    }
