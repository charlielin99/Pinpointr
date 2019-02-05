# PinPointr
Hack the North Champions. Used triangulation, multiplexing, kalman filtering, pulse-code modulation, & fast fourier transforms to pinpoint location with a high frequency sound wave methodology.

## Overview
The main routine of the app uses hard-coded, fixed positions of three sound receivers, a known signal frequency and a continuous input of decibel (logarithmic) power readings from each of the receivers. In order for the power input from each receiver to be converted to a distance reading, the inverse-square law for power decay is used. This requires some constant of proportionality (representing a unit conversion) to be calibrated during a controlled trial.

### Triangulation
After each receiver's power reading is converted to a distance, the distances detected by all three receivers are combined with the known positions of the receivers to triangulate the signal. A receiver reportin that a signal is X meters away corresponds geometrically to the signal lying on a sphere of radius R, centered at the receiver. Triangulation in three dimensions works by finding the unique point where all three spheres' surfaces intersect, thereby determining the 3D coordinates of the signal source.

### Doppler Shift
The 'Doppler Shift' refers to a physics effect wherein waves emitted by a moving source are frequency shifted depending on the speed and direction of the source. For a known frequency of sound, a receiver can determine the magnitude and direction of a component of velocity directed radially towards/away the receiver based on the difference between the expected frequency and the received frequency. In most situations, the radial velocity components reported by two receivers can be converted into cartesian coordinates and combined into a 3D velocity vector describing the motion of the object (in the special case where the object is travelling along a straight line passing through both receivers, a third receiver is required to confirm that there is no normal component of velocity). 

Any extra number of receivers beyond the required two can then be used to verify the motion of the signal source, and to make the algorithm more resiliant against bad data-taking or nonlinear behavior in the signal sources (echoes, for example).


