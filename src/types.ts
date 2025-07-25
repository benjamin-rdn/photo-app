export interface PhotoMetadata {
  exposureTime: string;
  fNumber: string;
  iso: string;
  focalLength: string;
}

export interface Photo {
  filename: string;
  keywords: string[];
  relativePath: string;
  metadata: PhotoMetadata;
}

export interface Library {
  name: string;
  path: string;
  photos: Photo[];
}

export type Libraries = Library[];

export type ViewMode = 'grid' | 'flow';
