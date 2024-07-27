knowledge_base = None
json_slide = None


def get_knowledge_base():
    """
    Returns the knowledge base.

    :return: The knowledge base.
    :rtype: object
    """
    return knowledge_base


def set_knowledge_base(new_context):
    """
    Set the knowledge base to the given new context.

    Args:
        new_context (object): The new context to set as the knowledge base.

    Returns:
        None
    """
    global knowledge_base
    knowledge_base = new_context


def get_json_slide():
    """
    Returns the JSON slide as a string.

    :return: A string representation of the JSON slide.
    :rtype: str
    """
    return str(json_slide)


def set_json_slide(json_data):
    """
    Set the JSON slide to the given JSON data.

    Args:
        json_data (str): The JSON data to set as the JSON slide.

    Returns:
        None
    """
    global json_slide
    json_slide = json_data
