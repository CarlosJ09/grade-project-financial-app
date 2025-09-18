class ContentItem {
  constructor(
    public readonly id: number,
    public readonly sectionId: string,
    public readonly moduleId: number,
    public readonly sequence: number,
    public readonly title: string,
    public readonly fileUrl: string,
    public readonly markdownBody: string
  ) {}
}

export { ContentItem };
