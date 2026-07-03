from langchain_core.tools import tool


@tool
def word_count(text: str) -> int:
    """Count the number of words in a piece of text."""
    return len(text.split())
