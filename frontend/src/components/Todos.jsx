import PropTypes from 'prop-types'; // Import PropTypes

export function Todos({ todos }) {
    return (
        <div>
            {todos.map(function (todo) {
                return (
                    <div key={todo.id}>
                        <h4>{todo.title}</h4>
                        <p>{todo.description}</p>
                        <button onClick={() => {
                            try {
                                fetch("http://localhost:3000/completed", {
                                    method: "PUT",
                                    body: JSON.stringify({ id: todo._id}),
                                    headers: {
                                        "content-type" : "Application/json"
                                    }
                                })
                                .then(async (res)=>{
                                    const json = await res.json();
                                    console.log(json);
                                    alert("Todo marked as Done. Please Refresh...");
                                })
                            } catch (e) {
                                alert("Error Occured...");
                                console.log(e);
                            }
                        }}>{todo.completed === true ? "Completed" : "Mark as Complete"}</button>
                        <p>Todo id : {todo._id}</p>
                    </div>
                );
            })}
        </div>
    );
}

// Add prop type validation
Todos.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired
};
