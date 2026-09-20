export type ProjectImage = {
  id: number;
  image_url: string;
  description: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  cover_image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  tags: string[];
  highlights: string[];
  published: boolean;
  images: ProjectImage[];
};

export type ProjectSnapshot = {
  title: string;
  description: string;
  github_url: string | null;
  demo_url: string | null;
  cover_image_url: string | null;
  published: boolean;
  tags: string[];
  images: { image_url: string; description: string | null }[];
};

export function toProjectSnapshot(project: Project): ProjectSnapshot {
  return {
    title: project.title,
    description: project.description,
    github_url: project.github_url ?? null,
    demo_url: project.demo_url ?? null,
    cover_image_url: project.cover_image_url ?? null,
    published: project.published,
    tags: project.tags,
    images: project.images.map((image) => ({
      image_url: image.image_url,
      description: image.description || null,
    })),
  };
}
