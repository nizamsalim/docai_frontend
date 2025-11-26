import type { Section } from "@/types/project.types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export async function generateWord({
  title,
  sections,
}: {
  title: string;
  sections: Section[];
}) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 36, // 18pt
              }),
            ],
          }),

          ...sections.flatMap((section) => [
            new Paragraph({
              spacing: { before: 300 },
              children: [
                new TextRun({
                  text: section.title,
                  bold: true,
                  size: 28,
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: section.content,
                  size: 24,
                }),
              ],
            }),
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title}.docx`);
}
