module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var tasks = context.bindings.tasks;
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        context.log("Found Task, Description=" + task.description);
    }


    context.res = {
        status: 200,
        body: tasks,
        headers: {
            "Content-Type": "application/json"
        }
    };
};