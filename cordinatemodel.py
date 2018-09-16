# -*- coding: utf-8 -*-
"""
Created on Sun Sep 15 10:45:23 2018

@author: Drew
"""
from scipy.io import wavfile
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from math import floor, ceil
from pylab import rcParams


data_stream1 = 'vol1.wav' 
data_stream2 = 'vol2.wav'
data_stream3 = 'vol3.wav'
label = 'cordinates.csv'

fs, data1 = wavfile.read(data_stream1)
fs, data2 = wavfile.read(data_stream2)
fs, data3 = wavfile.read(data_stream3)
data_main = pd.merge(data1, data2, data3)
train_x = data_main
train_y = pd.read_csv(label)

train_size = 0.8

train_size = floor(train_x.shape[0] * train_size)
x_train = train_x.iloc[0:train_size].values
y_train = train_y.iloc[0:train_size].values
x_test = train_x.iloc[train_size:].values
y_test = train_y.iloc[train_size:].values


def neural_net_simple(x, weights, biases, keep_prob):
    layer_1 = tf.add(tf.matmul(x, weights['h1']), biases['b1'])
    layer_1 = tf.nn.relu(layer_1)
    layer_1 = tf.nn.dropout(layer_1, keep_prob)
    out_layer = tf.matmul(layer_1, weights['out']) + biases['out']
    return out_layer

num_layer = 3
n_input = train_x.shape[1]
n_out = train_y.shape[1]

weights = {
    'h1': tf.Variable(tf.random_normal([n_input, num_layer])),
    'out': tf.Variable(tf.random_normal([num_layer, n_out]))}

biases = {
    'b1': tf.Variable(tf.random_normal([num_layer])),
    'out': tf.Variable(tf.random_normal([n_out]))}

keep_prob = tf.placeholder("float")

training_epochs = 5000
visualize = 1000
batch = 32

x = tf.placeholder("float", [None, n_input])
y = tf.placeholder("float", [None, n_out])

cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=predictions, labels=y))


optimization = tf.train.Adamoptimization(learning_rate=0.0001).minimize(cost)

predictions = neural_net_simple(x, weights, biases, keep_prob)

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    
    for epoch in range(training_epochs):
        avg_cost = 0.0
        total_batch = int(len(x_train) / batch)
        x_batches = np.array_split(x_train, total_batch)
        y_batches = np.array_split(y_train, total_batch)
        for i in range(total_batch):
            batch_x, batch_y = x_batches[i], y_batches[i]
            _, c = sess.run([optimization, cost], 
                            feed_dict={
                                x: batch_x, 
                                y: batch_y, 
                                keep_prob: 0.8
                            })
            avg_cost += c / total_batch
        if epoch % visualize == 0:
            print("The current epoch is:", '%04d' % (epoch+1), "with cost=", "{:.9f}".format(avg_cost))
    correct_prediction = tf.equal(tf.argmax(predictions, 1), tf.argmax(y, 1))
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))
    print("The accuracy:", accuracy.eval({x: x_test, y: y_test, keep_prob: 1.0}))