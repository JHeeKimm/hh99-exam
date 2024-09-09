import React, { useState } from "react";
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from "./components/styles";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import { __addToDo, __deleteTodo } from "./redux/modules/todosSlice";

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const status = useSelector((state) => state.todos.status);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const style = {
    flexGrow: "1",
    whiteSpace: "nowrap",
  };

  const onAddTodo = () => {
    if (title === "") return;
    dispatch(
      __addToDo({
        id,
        title,
        body,
      })
    );
    resetInputs();
  };

  const onDeleteTodo = (id) => {
    dispatch(__deleteTodo({ id }));
  };

  const resetInputs = () => {
    setTitle("");
    setBody("");
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span style={style}>제목: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span style={style}>내용: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />
          <Button onClick={onAddTodo}>+ 추가하기</Button>
        </InputContainer>
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
          {status === "pending" ? (
            <p style={{ margin: "0 auto" }}>로딩 중...</p>
          ) : (
            <p></p>
          )}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
