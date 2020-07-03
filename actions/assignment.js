
const assignmentAlgorithm = (body) => {
    return new Promise((resolve, reject) => {
        let res = [];
        let mapTrainers =[...body.trainers].map((el)=>{ 
            let ob = { 
                id: el.id, 
                available:el.available
            }
            return ob;
        })
        // Ordenamos por exigencia de clientes y por reputacion para poder asignar 
        let clients = body.clients.sort((a, b) => { return a.reputationTrainer < b.reputationTrainer });
        let trainers = body.trainers.sort((a, b) => { return a.reputation < b.reputation });
        clients.forEach(client => {
            trainers.some(trainer => {
                let searchAvailable = mapTrainers.find(el=>el.id=== trainer.id);
                if (searchAvailable.available > 0) {
                    linkClientToTrainer(res, trainer, client);
                    searchAvailable.available--;
                    return true;
                }
            })
        });
        resolve(res);
    })
}

const linkClientToTrainer = (res, trainer, client) => {
    let existTrainer = res.find(el => el.trainer.id === trainer.id);
    if (existTrainer)
        existTrainer.clients.push(client);
    else
        res.push({
            trainer: trainer,
            clients: [client]
        })
}

module.exports = {
    assignmentAlgorithm
}