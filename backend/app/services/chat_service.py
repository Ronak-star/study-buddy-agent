from collections.abc import AsyncIterator

from app.agent.graph import get_agent


async def run_agent(thread_id: str, message: str) -> str:
    agent = await get_agent()
    cfg = {"configurable": {"thread_id": thread_id}}
    result = await agent.ainvoke({"messages": [("user", message)]}, cfg)
    last_message = result["messages"][-1]
    return last_message.content


async def stream_agent(thread_id: str, message: str) -> AsyncIterator[str]:
    agent = await get_agent()
    cfg = {"configurable": {"thread_id": thread_id}}
    async for step in agent.astream(
        {"messages": [("user", message)]}, cfg, stream_mode="values"
    ):
        last_message = step["messages"][-1]
        if getattr(last_message, "content", None):
            yield last_message.content