-- Template migration: Add template type and gallery images to articles
-- Run this migration to add multi-template support for news articles

-- Add template column: 'single' (default), 'multi', 'gallery'
ALTER TABLE articles
ADD COLUMN template VARCHAR(50) NOT NULL DEFAULT 'single';

-- Add secondary images for 'multi' template (up to 3 extra images)
ALTER TABLE articles
ADD COLUMN img2 VARCHAR(500) DEFAULT '',
ADD COLUMN img3 VARCHAR(500) DEFAULT '',
ADD COLUMN img4 VARCHAR(500) DEFAULT '';

-- Add gallery_images as JSON array for 'gallery' template
ALTER TABLE articles
ADD COLUMN gallery_images JSON DEFAULT NULL;
