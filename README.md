# CHANDRA-BINDU

## Multi-Modal Lunar Image Registration System

**Smart India Hackathon 2026 | SIH26166**  
**Theme:** Space Technology  
**Category:** Software  
**Team:** Team Zynex
**Team id:** 132014

---

## 1. About the Project

CHANDRA-BINDU is a lunar image registration system developed for Smart India Hackathon 2026 Problem Statement SIH26166.

The project focuses on finding corresponding points between images of the same lunar region when the images are captured under different illumination conditions, viewing angles, scales, or by different sensors.

The system is designed around Chandrayaan-2 optical instruments such as:

- OHRC
- TMC-2
- IIRS

The main objective is to identify reliable and spatially distributed correspondence points and use them to align the source image with the reference image.

---

## 2. Problem Statement

### SIH26166

**Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC and IIRS).**

Images of the same lunar region can look significantly different because of:

- Different Sun illumination angles
- Shadows
- Different viewing directions
- Scale differences
- Different spatial resolutions
- Different sensor characteristics

Because of these differences, conventional feature matching can produce incorrect matches or matches concentrated only in highly textured areas.

The required system should therefore be able to find reliable correspondence points between lunar images and use them for accurate registration.

---

## 3. Objective

The main objectives of CHANDRA-BINDU are:

1. Find reliable correspondence points between lunar images.
2. Handle differences in illumination and image appearance.
3. Handle scale and viewing differences.
4. Maintain a good spatial distribution of correspondence points.
5. Remove incorrect feature matches.
6. Estimate the geometric relationship between source and reference images.
7. Refine correspondence points to sub-pixel accuracy.
8. Generate a registered lunar image.
9. Calculate registration accuracy using RMSE, inlier count and inlier ratio.
10. Provide the results through a web dashboard.

---

## 4. Why Lunar Image Registration is Difficult

The same lunar terrain does not always appear the same in two images.

### Illumination

The Sun angle changes the brightness and shadow pattern of the lunar surface.

### Viewing Geometry

Images captured from different viewing directions can have changes in the apparent position and shape of terrain structures.

### Scale

OHRC and TMC-2 images have different spatial resolutions, so the same terrain structure can appear at different scales.

### Sensor Differences

Different instruments can produce images with different characteristics and modalities.

### Feature Distribution

Traditional feature detection can produce many points in one textured area while leaving other areas with very few matches.

Therefore, the problem is not only finding matches, but finding matches that are reliable and distributed across the image.

---

## 5. Our Approach

CHANDRA-BINDU combines four main ideas:


Physics
   +
Image Structure
   +
Geometric Verification
   +
Sub-Pixel Refinement


The complete workflow is:

Source + Reference Images
          ↓
     Preprocessing
          ↓
 Illumination Handling
          ↓
    Coarse Alignment
          ↓
   Multi-Scale Processing
          ↓
Structure-Aware Features
          ↓
   Grid-Based Matching
          ↓
        RANSAC
          ↓
  Sub-Pixel Refinement
          ↓
   Image Registration
          ↓
    Results + Metrics


## 6. Physics Behind the Approach

The appearance of the lunar surface depends strongly on illumination and viewing geometry.

The same terrain can therefore have different brightness and shadow patterns in two observations.

A simplified view is:

Surface Properties
        +
Illumination Geometry
        +
Viewing Geometry
        ↓
Observed Image Appearance

Because of this, illumination needs to be considered before correspondence matching.
Our current approach follows a Lunar-Lambert based normalization direction to reduce the effect of illumination differences.
More advanced lunar photometric models such as Hapke-based modelling are considered as future work where suitable calibration and observation information is available.


## 7. Registration Pipeline

Step 1 - Input Images
Step 2 - Preprocessing
Step 3 - Illumination Handling
Step 4 - Coarse Alignment
Step 5 - Multi-Scale Processing
Step 6 - Structure-Aware Feature Extraction
Step 7 - Grid-Based Matching
Step 8 - Feature Matching
Step 9 - RANSAC
Step 10 - Sub-Pixel Refinement
Step 11 - Image Registration


## 8. Mathematical Model

For a source point:

p_source = (x_source, y_source)

and its corresponding reference point:

p_reference = (x_reference, y_reference)

the relationship can be represented as:

p_reference ≈ T(p_source)

For an affine transformation:

x_reference = a1*x_source + a2*y_source + tx

y_reference = a3*x_source + a4*y_source + ty

The reprojection error for a correspondence is:

e_i = || T(p_source_i) - p_reference_i ||


## 9. Evaluation Metrics

CHANDRA-BINDU uses several metrics to evaluate the registration.

RMSE

Root Mean Square Error measures the geometric error between corresponding points.

RMSE = sqrt( (1/N) * Σ(e_i²) )

A lower RMSE means lower average geometric error for the evaluated correspondences.

Inlier Count

The number of matches that remain consistent with the estimated geometric transformation.

Inlier Ratio
Inlier Ratio =
(Inlier Matches / Total Matches) × 100

These metrics provide a quantitative view of the registration result.


## 10. Technology Stack

## Frontend
React
TypeScript
Vite
Tailwind CSS

## Backend 
Python
FastAPI
Uvicorn

## Image Processing
OpenCV
NumPy
SciPy
scikit-image

## Geospatial Processing
GDAL
Rasterio

## Deployment
Docker


## 11. Expected Outputs

The system is designed to produce the following outputs:

Registered Image

The source image aligned with the reference image.

Correspondence Points

Source-to-reference coordinate pairs.

Source Point        Reference Point

(x1, y1)  --------> (x1', y1')
(x2, y2)  --------> (x2', y2')
(x3, y3)  --------> (x3', y3')
RMSE

Registration error in pixels.

Inlier Count

Number of geometrically consistent matches.

Inlier Ratio

Percentage of reliable matches.

Match Visualization

Visual representation of correspondence points between the images.

Overlay

Reference and registered images can be overlaid to inspect alignment.


## 12. Current Status

## Completed / Prototyped
Basic image registration workflow
Image preprocessing
Feature matching
Grid-based correspondence approach
RANSAC-based geometric estimation
Registration output
RMSE calculation
Inlier calculation
Web dashboard
Synthetic rotation and scale validation

## Current Work
Real OHRC/TMC-2 validation
Better evaluation on real lunar image pairs
Testing under illumination differences

## Future Work
IIRS evaluation
DEM-based terrain correction
Advanced lunar photometric modelling
Synthetic illumination datasets
Learned feature descriptors
Larger lunar image benchmarks


## 13. Limitations

The current prototype has some limitations:

The reported 0.572 px result comes from synthetic validation.
Real OHRC/TMC-2 validation is still being extended.
Complete real-world Sun-angle invariance has not yet been demonstrated.
IIRS has a larger resolution and modality difference.
DEM-based orthorectification is not part of the current baseline.
Full Hapke-based photometric modelling is a future research direction.

These limitations are kept explicit so that the current prototype and future work are clearly separated.


## 14.Data Sources

The project is intended to work with lunar imagery from sources such as:

Chandrayaan-2 OHRC
Chandrayaan-2 TMC-2
Chandrayaan-2 IIRS
LRO NAC
Other suitable lunar reference imagery

Real-data testing depends on obtaining suitable overlapping image pairs and the required metadata.


## Team
Team Zynex

Developed for:

Smart India Hackathon 2026

Problem Statement: SIH26166
Theme: Space Technology
Category: Software


## Project Name
CHANDRA-BINDU

Reliable correspondence between different observations of the same lunar terrain.


