import Sequelize from 'sequelize';

var sequelize = new Sequelize('eduard72_consultagoogle', 'eduard72_felipe', 'oQnD~rzZWG&9', {
    host: 'sh-pro20.hostgator.com.br',
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false
});

sequelize.authenticate().then(() => { }).catch(err => {
    console.error('Erro ao conectar a banco de dados: ', err);
});

async function app() {

    await sequelize.query("DELETE from emails where id not in ( SELECT * FROM(select min(id) from emails group by email) AS temp_tab)");
    await sequelize.query('DELETE FROM emails WHERE email like "%1%" || email like "%2%" || email like "%3%" ||email like "%4%" || email like "%5%" || email like "%6%" || email like "%7%" || email like "%8%" || email like "%9%"');

    var getEmail = await sequelize.query("SELECT * FROM `emails`");

    getEmail.forEach(async function(email){

        var name = email.email
        name = name.split("@")
        name = name[0]

        var arrayFields = {
            "firstname": name,
            "email": email.email,
            "state":email.estado,
            "tags":[email.categoria,email.estado,"Google"]
            }

        var optionsMautic = {
            method: 'post',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y2FkYXN0cm9icjpXZWJtYXN0ZXIxMjMxKg==',
                'Cookie': 'mautic_device_id=1ptosd2ouwqe16617j5psrrn0'
            },
            body: JSON.stringify(arrayFields)
        }

        await fetch('https://editoraeuro.com.br/api/contacts/new', optionsMautic)
            .then(function (response) {
             delay(200)
            })
            .catch(err => console.log(err))

        })
}
app()