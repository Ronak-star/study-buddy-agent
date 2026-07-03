from langchain_core.tools import tool


@tool
def summarize_notes(text: str, max_sentences: int = 3) -> str:
    """Summarize study notes into a short number of sentences (naive truncation).
    In production, replace this with a proper LLM-based summarizer chain.
    """
    sentences = [s.strip() for s in text.split(".") if s.strip()]
    return ". ".join(sentences[:max_sentences]) + ("." if sentences else "")


@tool
def make_flashcards(topic: str, count: int = 5) -> str:
    """Generate a placeholder list of flashcard prompts for a given topic."""
    return "\n".join(f"{i+1}. What is an important fact about {topic}?" for i in range(count))
