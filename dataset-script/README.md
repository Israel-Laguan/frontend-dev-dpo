# Dataset script

## Installation

1. Clone this repository to your local machine.
2. Make sure you have **Node.js** installed.
3. Set the `GEMINI_API_KEY` in your environment variables:
   Add this key to a `.env` file in the root directory:

```bash
   GEMINI_API_KEY=your_api_key_here
```

4. Run the following command to install the required dependencies:

```bash
   npm install
```

## Usage

1. Prepare your **initial prompt**:

   - Create a file in the `inputs` directory named **`extended_prompt.md`**.
   - Write the content or initial instructions you want to use in this file.

2. Add the **data to handle**:

   - Create a file in the `inputs` directory named **`train.json`**.
   - Add the data you want to process in JSON format to this file.

3. Run the application:
   - Once the necessary files are configured, execute the following command:

```bash
     npm start
```

4. Done! The application will process the data according to the defined configuration.  
   Either if the validation or the request fails, a file named `retry` will be generated, containing the inputs that could not be processed.  
   All output files will be saved in the `output` directory within the root path.
