import { useEffect, useState } from 'react';

interface FlowPhotoViewProps {
  photos: string[];
  basePath: string;
  onPhotoClick: (photo: string) => void;
  height?: number;
}

const FlowPhotoView = ({ photos, basePath, onPhotoClick, height = 200 }: FlowPhotoViewProps) => {
  const [photoHeight, setPhotoHeight] = useState<number>(() => {
    const savedHeight = localStorage.getItem('photoHeight');
    return savedHeight ? parseInt(savedHeight) : height;
  });

  const [photoMargin, setPhotoMargin] = useState<number>(() => {
    const savedMargin = localStorage.getItem('photoMargin');
    return savedMargin ? parseInt(savedMargin) : 5;
  });

  useEffect(() => {
    localStorage.setItem('photoHeight', photoHeight.toString());
  }, [photoHeight]);

  useEffect(() => {
    localStorage.setItem('photoMargin', photoMargin.toString());
  }, [photoMargin]);

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="photoHeight" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Height:
          </label>
          <input
            id="photoHeight"
            type="range"
            min="100"
            max="800"
            step="10"
            value={photoHeight}
            onChange={(e) => setPhotoHeight(parseInt(e.target.value))}
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.875rem', color: '#6b7280', minWidth: '40px' }}>{photoHeight}px</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="photoMargin" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Margin:
          </label>
          <input
            id="photoMargin"
            type="range"
            min="0"
            max="50"
            step="1"
            value={photoMargin}
            onChange={(e) => setPhotoMargin(parseInt(e.target.value))}
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.875rem', color: '#6b7280', minWidth: '40px' }}>{photoMargin}px</span>
        </div>
      </div>

      <div className="flow-photo-grid">
        {photos.map((photo) => (
          <button
            key={photo}
            onClick={() => onPhotoClick(photo)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPhotoClick(photo);
              }
            }}
            aria-label={`View ${photo}`}
            type="button"
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              margin: `${photoMargin}px`,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}>
            <div
              style={{
                height: `${photoHeight}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <img
                src={`${basePath}/${photo}`}
                alt={photo}
                style={{
                  height: '100%',
                  objectFit: 'contain',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.2s',
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlowPhotoView;
