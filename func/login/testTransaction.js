




sequelize.transaction(async function(tx) {
 
    await User.destroy({
        where: {
            id: [1,2,3]
        },
        transaction: tx
    });
 
    await Item.destroy({
        where: {
            id: [1,2,3]
        },
        transaction: tx
    });
});