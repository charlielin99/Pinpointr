import numpy as np
import argparse
import sys



def triangulate_on_timestamps_2D(p1, p2, p3, k1=1/(4*np.pi), k2=1):
    """
    given a list of three times representing time difference between
    i-th receiver receiving the signal and the signal origin time,
    determine the position of the origin
    args:
        p is the input signal in arbitrary units proportional to decibels
    kwargs:
        k1 is a proportionality constant for power falloff of the tone
        k2 is a proportionality constant for converting p -> dB
    """

    x1, y1 = R1[0], R1[1]
    x2, y2 = R2[0], R2[1]
    x3, y3 = R3[0], R3[1]

    parr = k2*np.array([p1, p2, p3])/10
    v1, v2, v3 = np.power(10, parr)
    r1, r2, r3 = k1/v1, k1/v2, k1/v3
    # Determine some coefficients to do basic linear algebra
    A = x3 - x2
    B = y3 - y2
    C = .5*(r2**2 - x2**2 - y2**2) - .5*(r3**2 - x3**2 - y3**2)
    D = x3 - x1
    E = y3 - y1
    F = .5*(r1**2 - x1**2 - y1**2) - .5*(r3**2 - x3**2 - y3**2)

    # solve the linear equation
    Q = np.array([[A, B],
                    [D, E]])
    P = np.array([[C], [F]])
    S = np.linalg.inv(Q).dot(P)
    x, y = S[0][0], S[1][0]

    return x,y


def dopler_on_timesignals(f1, f2, f3):
    return


# # # # main routine
parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('powers', metavar='p', type=float, nargs='+',
                    help='an integer for the accumulator')
args = parser.parse_args()

# fixed positions of laptops
# POSITIONS OF RECIEVERS, in [m]
R1 = (0, 0)
R2 = (3, 4)
R3 = (1, 5)


coords = triangulate_on_timestamps_2D(*args.powers)
print(coords[0], coords[1])
sys.stdout.flush()
