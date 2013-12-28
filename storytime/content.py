from storytime import app
from storytime.mock import MOCK_STORY

def get_content(story, page, lipsum=False):
	if lipsum:
		return MOCK_STORY[page]
