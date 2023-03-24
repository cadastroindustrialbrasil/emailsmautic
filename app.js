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

async function app(){

 await sequelize.query("DELETE from emails where id not in ( SELECT * FROM(select min(id) from emails group by email) AS temp_tab)");
        await sequelize.query('DELETE FROM emails WHERE email like "%1%" || email like "%2%" || email like "%3%" ||email like "%4%" || email like "%5%" || email like "%6%" || email like "%7%" || email like "%8%" || email like "%9%"');


         var getEmail = await sequelize.query("SELECT * FROM `emails`");

    console.log(getEmail)
}
app()