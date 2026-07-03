# from langchain_anthropic import ChatAnthropic
# from langgraph.prebuilt import create_react_agent

# from app.agent.checkpointer import get_checkpointer
# from app.agent.prompts import SYSTEM_PROMPT
# from app.agent.tools import ALL_TOOLS
# from app.core.config import settings

# _agent = None


# async def get_agent():
#     global _agent
#     if _agent is None:
#         checkpointer = await get_checkpointer()
#         llm = ChatAnthropic(
#             model="claude-sonnet-5",
#             api_key=settings.ANTHROPIC_API_KEY,
#             temperature=0.3,
#         )
#         _agent = create_react_agent(
#             llm,
#             tools=ALL_TOOLS,
#             checkpointer=checkpointer,
#             prompt=SYSTEM_PROMPT,
#         )
#     return _agent



from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from app.agent.checkpointer import get_checkpointer
from app.agent.prompts import SYSTEM_PROMPT
from app.agent.tools import ALL_TOOLS
from app.core.config import settings

_agent = None


async def get_agent():
    global _agent
    if _agent is None:
        checkpointer = await get_checkpointer()
        llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=settings.GROQ_API_KEY,
            temperature=0.3,
        )
        _agent = create_react_agent(
            llm,
            tools=ALL_TOOLS,
            checkpointer=checkpointer,
            prompt=SYSTEM_PROMPT,
        )
    return _agent