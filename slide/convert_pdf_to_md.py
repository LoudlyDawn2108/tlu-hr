import os
import pypdf

def convert_pdf_to_md(pdf_path):
    try:
        reader = pypdf.PdfReader(pdf_path)
        base_name = os.path.splitext(pdf_path)[0]
        md_path = base_name + ".md"
        
        print(f"Converting {pdf_path} to {md_path}...")
        
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(f"# {os.path.basename(base_name)}\n\n")
            
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                f.write(f"## Page {i+1}\n\n")
                if text:
                    f.write(text + "\n\n")
                else:
                    f.write("*[No text extracted from this page]*\n\n")
                f.write("---\n\n")
        print(f"Successfully converted {pdf_path}")
    except Exception as e:
        print(f"Failed to convert {pdf_path}: {e}")

def main():
    files = [f for f in os.listdir('.') if f.endswith('.pdf')]
    for file in files:
        convert_pdf_to_md(file)

if __name__ == "__main__":
    main()
