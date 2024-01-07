import os
import replicate
import sys

def response(url):
    os.environ["REPLICATE_API_TOKEN"] = "r8_Sm0LXdHBWaHm8GMHOdeAqYEse8l0UId1I3T19"

    # Prompts
    pre_prompt = "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'."
    prompt_input = "is this inappropriate? "
    prompt_input += "'" + url + "'"

    # Generate LLM response
    output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', # LLM model
                            input={"prompt": f"{pre_prompt} {prompt_input} Assistant: ", # Prompts
                            "temperature":1, "top_p":0.9, "max_length":100, "repetition_penalty":1})  # Model parameters

    # Print response
    full_response = ""

    # print(output)
    # sys.stdout.flush()

    for item in output:
        full_response += item

    print(full_response)


if __name__ == "__main__":
    response("i like flowers")