module.exports = async function (context, req, task) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log('JavaScript HTTP trigger function processed a request.');

    if (!task)
    {
        context.log("Task not found");
        context.res = {
            status: 404,
            body: "Task not found"
        };
    }
    else
    {
        context.log("Found Task, Description=" + task.description);
        context.res = {
            status: 200,
            body: task,
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    context.done();
};