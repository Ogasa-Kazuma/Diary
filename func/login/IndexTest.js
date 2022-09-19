const Sequelize = require("sequelize");

module.exports = class UserInfoDBManager{
    #connectionSettings;
    #connection;
    #table;
    
    constructor(){
        this.#connection = null;
        this.#table = {
            "object" : null,
            "columns" : null
        }
    }
    
    #makeTableDefinition(){
        const columns = {
            id : {field: "id", type: Sequelize.STRING(255), primaryKey: true, allowNull: false},
            password : {field: "password", type: Sequelize.STRING(255), allowNull: false},
            name : {field: "name", type: Sequelize.STRING(255), allowNull: false}
        }
        const options = {
            timestamps: false
        }
        const tableDefinition = {"name": "test_informations", "columns": columns, "options": options};
        return tableDefinition;
    }
    
    #initConnectionSettings(){
        const dbName = "testIndex";
        const password = "Dxsqk%9u1";
        this.#connection = new Sequelize(dbName, "root", password, {
            host: "localhost",
            dialect: "mysql",
            logging: false
        })
        
        const tableDefinition = this.#makeTableDefinition();
        
        this.#table.object = this.#connection.define(tableDefinition.name, tableDefinition.columns, tableDefinition.options);
        this.#table.columns = Object.keys(tableDefinition.columns);
    }
    
    async #disconnect(){
        await this.#connection.close();
    }
    
    async read(id){
        this.#initConnectionSettings();
        
        const query = {where : {"id" : id}};
        const result = await this.#table.object.findOne(query);
        await this.#disconnect();
        return result;
    }
    
    async register(id, password, name){
        this.#initConnectionSettings();
        const datasToRegister = {"id": id, "password": password, "name": name};
        await this.#table.object.create(datasToRegister);
        console.log("データ登録成功!");
        await this.#disconnect();
    }
}